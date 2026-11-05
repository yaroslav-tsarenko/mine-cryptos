import { useState } from "react";
import { cx } from "../../lib/cx";
import { DEMO_REFERRAL } from "../../lib/site";
import { Icon } from "../ui/Icon";
import { useToast } from "../ui/useToast";
import styles from "./ReferralLink.module.css";
import { copyText } from "../../lib/clipboard";


/** Copy-to-clipboard referral link with success state and toast. */
export function ReferralLink({ link = DEMO_REFERRAL, compact }: { link?: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const { notify } = useToast();
  const copy = async () => {
    try {
      await copyText(link);
      setCopied(true);
      notify({ title: "Referral link copied", description: "Share it with friends to start earning commission." });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      notify({ kind: "error", title: "Couldn't copy automatically", description: "Select the link and copy it manually." });
    }
  };
  return (
    <div className={cx(styles.wrap, compact && styles.compact)}>
      <label className="visually-hidden" htmlFor="ref-link">
        Your referral link
      </label>
      <input id="ref-link" readOnly value={link} onFocus={(e) => e.currentTarget.select()} />
      <button type="button" onClick={copy} className={cx(styles.btn, copied && styles.copied)}>
        <Icon name={copied ? "check" : "copy"} size={18} />
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
