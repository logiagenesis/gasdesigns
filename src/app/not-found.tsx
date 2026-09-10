import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="shell" style={{ display: "grid", gap: 18, justifyItems: "center" }}>
        <p className="notfound-code">Error 404</p>
        <h1 className="t-h2">That page is not here</h1>
        <p className="t-body measure" style={{ textAlign: "center" }}>
          The link may be out of date, or the page may never have existed. The
          services index is the fastest way back to something useful.
        </p>
        <div className="cta-actions">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/services" className="btn btn-ghost">
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
