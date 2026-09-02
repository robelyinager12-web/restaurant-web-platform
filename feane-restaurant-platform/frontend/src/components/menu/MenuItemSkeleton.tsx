// File: frontend/src/components/menu/MenuItemSkeleton.tsx
export function MenuItemSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white/5">
      <div className="h-44 w-full bg-white/10" />
      <div className="p-5">
        <div className="h-4 w-2/3 rounded bg-white/10" />
        <div className="mt-3 h-3 w-full rounded bg-white/5" />
        <div className="mt-1.5 h-3 w-4/5 rounded bg-white/5" />
        <div className="mt-5 flex items-center justify-between">
          <div className="h-4 w-12 rounded bg-white/10" />
          <div className="h-7 w-16 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}