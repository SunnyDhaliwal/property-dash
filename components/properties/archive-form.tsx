"use client";
export function ArchiveForm({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "Archive this property? You can still view it in the archived properties list.",
          )
        )
          event.preventDefault();
      }}
    >
      <button className="button button-secondary">Archive property</button>
    </form>
  );
}
