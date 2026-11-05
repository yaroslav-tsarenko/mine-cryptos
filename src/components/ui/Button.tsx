import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { cx } from "../../lib/cx";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "white" | "ghost" | "link" | "danger";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconLeft?: IconName;
  block?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { to: string; href?: never; onClick?: () => void; state?: unknown };
type AsAnchor = Common & { href: string; to?: never; onClick?: never };
type AsButton = Common & { to?: never; href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export type ButtonProps = AsLink | AsAnchor | AsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconLeft, block, loading, className, children } = props;
  const cls = cx(styles.btn, styles[variant], styles[size], block && styles.block, loading && styles.loading, className);
  const content = (
    <>
      {loading ? <span className="spinner" aria-hidden="true" /> : iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {icon && !loading && <Icon name={icon} size={18} className={styles.trailing} />}
    </>
  );

  if ("to" in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={cls} onClick={props.onClick} state={props.state}>
        {content}
      </Link>
    );
  }
  if ("href" in props && props.href !== undefined) {
    return (
      <a href={props.href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  const {
    variant: _v,
    size: _s,
    icon: _i,
    iconLeft: _il,
    block: _b,
    loading: _l,
    className: _c,
    children: _ch,
    type = "button",
    disabled,
    ...rest
  } = props as AsButton;
  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
