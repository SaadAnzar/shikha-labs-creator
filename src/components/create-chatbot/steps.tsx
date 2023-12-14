import DataTab from "@/components/create-chatbot/steps/data"
import ModelTab from "@/components/create-chatbot/steps/model"
import PropertiesTab from "@/components/create-chatbot/steps/properties"

interface SidebarNavProps {
  activeTab: string
}

export function ChatbotStepsBox({ activeTab }: SidebarNavProps) {
  return (
    <ol className="divide-secondary bg-accent-foreground text-secondary grid w-full grid-cols-1 divide-x-4 overflow-hidden rounded-full px-2 text-sm sm:grid-cols-3">
      <PropertiesTab active={activeTab == "properties"} />
      <DataTab active={activeTab == "data"} />
      <ModelTab active={activeTab == "model"} />
    </ol>
  )
}
