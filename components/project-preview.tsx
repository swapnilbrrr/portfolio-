import type { ProjectPreview } from "@/lib/types";

export function ProjectPreviewPanel({
  preview,
  className = "",
}: {
  preview: ProjectPreview;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-md border border-hairline bg-surface/60 ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-1.5">
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {preview.file}
        </span>
        <span className="label-mono shrink-0">{preview.lang}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-[1.7] text-foreground/90">
        <code>{preview.code}</code>
      </pre>
      <figcaption className="border-t border-hairline px-4 py-2 text-xs leading-relaxed text-muted-foreground">
        {preview.caption}
      </figcaption>
    </figure>
  );
}
