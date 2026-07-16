type Event = {
  id: string;
  title: string;
  event_date: string;
  description?: string | null;
  profiles?:
    { full_name: string | null } | { full_name: string | null }[] | null;
};
export function TimelineList({ events }: { events: Event[] }) {
  if (!events.length)
    return <p className="text-slate-600">No activity has been recorded yet.</p>;
  return (
    <ol className="grid gap-4">
      {events.map((event) => {
        const profile = Array.isArray(event.profiles)
          ? event.profiles[0]
          : event.profiles;
        return (
          <li className="border-l-2 border-emerald-700 pl-4" key={event.id}>
            <p className="font-semibold">{event.title}</p>
            {event.description && <p>{event.description}</p>}
            <p className="text-sm text-slate-600">
              <time dateTime={event.event_date}>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "medium",
                }).format(new Date(event.event_date))}
              </time>
              {profile?.full_name ? ` · ${profile.full_name}` : ""}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
