const fs = require("fs");
const path = require("path");

// Load the fixtures from the request_reference directory
function serveFixture(req, fixtureName) {
  const fixturePath = path.join(__dirname, "../request_reference", fixtureName);
  if (fs.existsSync(fixturePath)) {
    let body = fs.readFileSync(fixturePath, "utf8");

    // Do we need to handle dynamic draw data from Datatables?

    req.respond({
      status: 200,
      contentType: "application/json",
      body,
    });
    return true;
  }
  return false;
}

module.exports = async (page) => {
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    const url = req.url();
    if (!url.startsWith("http://localhost:8000")) {
      req.continue();
      return;
    }

    const parsed = new URL(url);
    const pathname = parsed.pathname;
    const params = parsed.searchParams;

    // 1. /packages?format=datatables (ignore extra DataTables params)
    if (
      (pathname === "/packages" || pathname === "/packages/") &&
      params.get("format") === "datatables"
    ) {
      if (serveFixture(req, "packages--format=datatables__get.json")) return;
    }

    // 2. /packages/:id (detail)
    const packageIdMatch = pathname.match(/^\/packages\/([a-f0-9-]+)$/);
    if (packageIdMatch && !params.toString()) {
      const fname = `packages_${packageIdMatch[1]}__get.json`;
      if (serveFixture(req, fname)) return;
    }

    // 3. /packages/:id/events?format=datatables
    const eventsMatch = pathname.match(/^\/packages\/([a-f0-9-]+)\/events$/);
    if (eventsMatch && params.get("format") === "datatables") {
      const fname = `packages_${eventsMatch[1]}_events--format=datatables__get.json`;
      if (serveFixture(req, fname)) return;
    }

    // 4. /events/:id (detail)
    const eventIdMatch = pathname.match(/^\/events\/([a-f0-9-]+)$/);
    if (eventIdMatch && !params.toString()) {
      const fname = `events_${eventIdMatch[1]}__get.json`;
      if (serveFixture(req, fname)) return;
    }

    // 5. /events?outcome=FAILURE&format=datatables (ignore extra DataTables params)
    if (
      (pathname === "/events" || pathname === "/events/") &&
      params.get("outcome") === "FAILURE" &&
      params.get("format") === "datatables"
    ) {
      if (
        serveFixture(req, "events--outcome=FAILURE&format=datatables__get.json")
      )
        return;
    }
  });
};
