import { isRouteErrorResponse, useRouteError } from "react-router";
import { Button } from "../ui/Button";
import styles from "../../pages/NotFound.module.css";

/** Router-level error boundary (e.g. a lazy chunk failed to load after a deploy). */
export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Something went wrong";
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          Oops
        </p>
        <h1 className={styles.title}>{message}</h1>
        <p className={styles.text}>The page could not be displayed. Reloading usually fixes it — if not, head back home.</p>
        <div className={styles.actions}>
          <Button variant="white" onClick={() => window.location.reload()} iconLeft="refresh">
            Reload page
          </Button>
          <Button variant="ghost" onClick={() => window.location.assign("/")}>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
