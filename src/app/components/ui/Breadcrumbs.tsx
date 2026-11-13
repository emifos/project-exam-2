import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate mb-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink font-medium">
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true"> | </span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
