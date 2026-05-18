/**
 * Netlify Function: last 14 calendar days of GitHub contributions (UTC).
 * Env (Netlify → Site configuration → Environment variables):
 *   GITHUB_TOKEN  — fine-grained or classic PAT with read:user
 *   GITHUB_LOGIN  — optional; defaults to the authenticated user from the token
 */

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function respond(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: Object.assign({}, JSON_HEADERS, extraHeaders || {}),
    body: typeof body === "string" ? body : JSON.stringify(body),
  };
}

exports.handler = async function (event) {
  const method = event.httpMethod || "GET";

  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (method !== "GET") {
    return respond(405, { error: "Method not allowed" }, { Allow: "GET, OPTIONS" });
  }

  const token = (process.env.GITHUB_TOKEN || "").trim();
  if (!token) {
    return respond(503, { error: "Missing GITHUB_TOKEN on the server" });
  }

  try {
    let login = (process.env.GITHUB_LOGIN || "").trim();
    if (!login) {
      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/vnd.github+json",
          "User-Agent": "kennethvemagiri.com-contributions",
        },
      });
      if (!userRes.ok) {
        return respond(502, { error: "Could not resolve GitHub user from token" });
      }
      const userJson = await userRes.json();
      login = userJson.login;
      if (!login) {
        return respond(502, { error: "GitHub user login missing" });
      }
    }

    const today = new Date();
    const fromDay = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 21)
    );
    const toDay = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59)
    );

    const query =
      "query($login: String!, $from: DateTime!, $to: DateTime!) { " +
      "user(login: $login) { " +
      "contributionsCollection(from: $from, to: $to) { " +
      "contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }";

    const gqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "User-Agent": "kennethvemagiri.com-contributions",
      },
      body: JSON.stringify({
        query,
        variables: {
          login,
          from: fromDay.toISOString(),
          to: toDay.toISOString(),
        },
      }),
    });

    const gqlJson = await gqlRes.json();
    if (!gqlRes.ok || gqlJson.errors) {
      return respond(502, {
        error: "GitHub GraphQL error",
        details: gqlJson.errors || gqlJson.message || null,
      });
    }

    const user = gqlJson.data && gqlJson.data.user;
    if (!user || !user.contributionsCollection) {
      return respond(404, { error: "Unknown GitHub user: " + login });
    }

    const weeks = (user.contributionsCollection.contributionCalendar || {}).weeks || [];
    const byDate = {};
    weeks.forEach(function (week) {
      (week.contributionDays || []).forEach(function (day) {
        if (day && day.date) {
          byDate[day.date] = day.contributionCount || 0;
        }
      });
    });

    const dates = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i)
      );
      dates.push(d.toISOString().slice(0, 10));
    }

    const counts = dates.map(function (dateStr) {
      return typeof byDate[dateStr] === "number" ? byDate[dateStr] : 0;
    });

    return respond(
      200,
      { counts, login },
      { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" }
    );
  } catch (err) {
    return respond(500, { error: "Server error" });
  }
};
