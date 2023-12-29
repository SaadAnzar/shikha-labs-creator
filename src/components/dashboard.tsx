"use client"

import Image from "next/image"
import Link from "next/link"
import { DocumentData, collection, orderBy, query } from "firebase/firestore"
import { Loader, Plus } from "lucide-react"
import { useCollection } from "react-firebase-hooks/firestore"

import { db } from "@/config/firebase"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"

import { Button } from "./ui/button"

const Dashboard = () => {
  const [chatbots, loading] = useCollection(
    query(collection(db, "chatbots"), orderBy("createdAt", "desc"))
  )

  // const filteredChatbots = chatbots?.docs?.filter((chatbot: DocumentData) => {
  //   const data = chatbot.data()
  //   if (selectedGrades.length > 0 && selectedSubjects.length > 0) {
  //     return (
  //       selectedGrades.includes(data.grade) &&
  //       selectedSubjects.includes(data.subject)
  //     )
  //   } else if (selectedGrades.length > 0) {
  //     return selectedGrades.includes(data.grade)
  //   } else if (selectedSubjects.length > 0) {
  //     return selectedSubjects.includes(data.subject)
  //   }
  //   return true
  // })

  return (
    <section className="h-full w-full py-8">
      <div className="container px-16">
        <div className="flex">
          <div className="ml-auto">
            <Button asChild className="text-[18.5px] font-semibold">
              <Link href="/create-chatbot">
                <Plus className="mr-2 h-5 w-5" /> New
              </Link>
            </Button>
          </div>
        </div>

        {chatbots?.empty && (
          <div className="bg-accent mt-3 flex flex-col items-center justify-center rounded-lg pb-4">
            <Image
              alt="You don't have any chatbots yet."
              src="/create.svg"
              height={200}
              width={250}
              priority
            />
            <p className="text-left text-lg font-medium tracking-tight">
              You don&apos;t have any chatbot yet. Create a chatbot to get
              started.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex h-[65vh] items-center justify-center">
            <Loader strokeWidth="3px" className="h-16 w-16 animate-spin" />
          </div>
        )}

        <ul className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
          {chatbots?.docs?.map((chatbot: DocumentData) => (
            <ChatbotCard
              key={chatbot.id}
              id={chatbot.id}
              chatbot={chatbot.data()}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Dashboard
