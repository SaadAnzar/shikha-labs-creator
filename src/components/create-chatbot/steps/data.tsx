import { Database } from "lucide-react"

export default function DataTab({ active }: { active: boolean }) {
  return (
    <li className="flex items-center justify-center gap-2 p-4">
      {active ? (
        <div className="bg-muted rounded-full p-2">
          <Database className="text-primary shrink-0" />
        </div>
      ) : (
        <div className="bg-muted rounded-full p-2 opacity-[0.45]">
          <Database className="text-primary shrink-0" />
        </div>
      )}

      <p>
        <strong className="mb-0.5 block text-lg font-bold leading-4">
          Data
        </strong>
        <small className="text-sm">Choose document to act as data source</small>
      </p>
    </li>
  )
}
