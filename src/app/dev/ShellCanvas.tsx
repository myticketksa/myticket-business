import { EmptyState } from "@/components/biz/empty-state"

export function ShellCanvas() {
  return (
    <div className="px-gutter py-xl">
      <EmptyState
        variant="gated"
        title="This page isn’t available for this account."
        body="Open a page from the sidebar that belongs to this workspace."
      />
    </div>
  )
}
