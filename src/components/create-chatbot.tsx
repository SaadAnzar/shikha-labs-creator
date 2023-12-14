"use client"

import { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Loader2 } from "lucide-react"
import { Session } from "next-auth"
import { toast } from "sonner"

import { db } from "@/config/firebase"
import { Button } from "@/components/ui/button"
import Chatbot from "@/components/create-chatbot/chatbot"
import Data from "@/components/create-chatbot/data"
import Model from "@/components/create-chatbot/model"
import Properties from "@/components/create-chatbot/properties"
import { ChatbotStepsBox } from "@/components/create-chatbot/steps"
import Loader from "@/components/loader"

interface CreateChatbotProps {
  session: Session
}

export default function CreateChatbot({ session }: CreateChatbotProps) {
  const [activeTab, setActiveTab] = useState<string>("properties")
  const [loading, setLoading] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [welcomeMessage, setWelcomeMessage] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [indexName, setIndexName] = useState<string>("")
  const [tags, setTags] = useState<string>("")
  const [prompt, setPrompt] = useState<string>("")
  const [namespace, setNamespace] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const handleButtonClick = (e: any) => {
    e.preventDefault()

    if (!name) {
      toast.warning("Please enter a name for your chatbot.")
    } else if (name.length < 3) {
      toast.warning("Name must be at least 3 characters long.")
    } else if (!welcomeMessage) {
      toast.warning("Please enter a welcome message for your chatbot.")
    } else if (welcomeMessage.length < 3) {
      toast.warning("Welcome message must be at least 3 characters long.")
    } else {
      setActiveTab("data")
    }
  }

  const createChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) {
      toast.warning("Please enter a name for your chatbot.")
    } else if (name.length < 3) {
      toast.warning("Name must be at least 3 characters long.")
    } else if (!welcomeMessage) {
      toast.warning("Please enter a welcome message for your chatbot.")
    } else if (welcomeMessage.length < 3) {
      toast.warning("Welcome message must be at least 3 characters long.")
    } else if (!prompt && !namespace) {
      console.log(prompt, namespace)
      toast.error(
        "Either uploaded document or prompt is required to create a chatbot."
      )
    } else
      try {
        setLoading(true)

        await addDoc(collection(db, "chatbots"), {
          chatbotName: name,
          imageURL: imagePreview,
          welcomeMessage: welcomeMessage,
          description: description,
          namespace: namespace,
          indexName: indexName,
          tags: tags,
          prompt: prompt,
          creator: session?.user?.email!,
          createdAt: serverTimestamp(),
        })
        setLoading(false)
        toast.success("Your chatbot has been created.")
        setName("")
        setImagePreview("")
        setWelcomeMessage("")
        setDescription("")
        setNamespace("")
        setIndexName("")
        setTags("")
        setPrompt("")
        setActiveTab("properties")
        window.scrollTo(0, 0)
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
      }
  }

  if (isLoading) return <Loader />

  return (
    <div className="hidden space-y-6 px-10 pb-16 pt-5 md:block">
      <div className="flex items-center gap-5 space-y-0.5">
        <ChatbotStepsBox activeTab={activeTab} />
      </div>
      <div className="grid grid-flow-col-dense grid-cols-7 space-y-8 lg:space-x-4 lg:space-y-0">
        <div className="col-span-4">
          <div className="grid grid-flow-row grid-cols-4 gap-3">
            <div className="bg-secondary/50 col-span-4 rounded-lg">
              <form onSubmit={createChatbot}>
                {activeTab === "properties" && (
                  <div>
                    <Properties
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                      name={name}
                      setName={setName}
                      welcomeMessage={welcomeMessage}
                      setWelcomeMessage={setWelcomeMessage}
                      description={description}
                      setDescription={setDescription}
                    />
                    <div className="my-3 flex justify-center">
                      <Button onClick={handleButtonClick}>Next</Button>
                    </div>
                  </div>
                )}
                {activeTab === "data" && (
                  <div>
                    <Data
                      namespace={namespace}
                      setNamespace={setNamespace}
                      indexName={indexName}
                      setIndexName={setIndexName}
                      tags={tags}
                      setTags={setTags}
                    />
                    <div className="my-5 flex justify-center gap-4">
                      <Button onClick={() => setActiveTab("properties")}>
                        Back
                      </Button>
                      <Button onClick={() => setActiveTab("model")}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {activeTab === "model" && (
                  <div>
                    <Model
                      prompt={prompt}
                      setPrompt={setPrompt}
                      indexName={indexName}
                    />
                    <div className="my-5 flex justify-center">
                      {!loading ? (
                        <div className="flex gap-4">
                          <Button onClick={() => setActiveTab("data")}>
                            Back
                          </Button>
                          <Button type="submit">Create Chatbot</Button>
                        </div>
                      ) : (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Chatbot...
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="sticky top-[4.5rem]">
            <Chatbot
              imagePreview={imagePreview}
              name={name}
              welcomeMessage={welcomeMessage}
              description={description}
              indexName={indexName}
              namespace={namespace}
              tags={tags}
              prompt={prompt}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
