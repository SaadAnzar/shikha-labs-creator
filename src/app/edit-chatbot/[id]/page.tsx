import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import EditChatbot from "@/components/edit-chatbot"

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = params

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <EditChatbot session={session} chatbotid={id} />
}
