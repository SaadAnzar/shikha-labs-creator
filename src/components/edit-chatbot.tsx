"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { Loader2 } from "lucide-react"
import { Session } from "next-auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { toast } from "sonner"

import { db } from "@/config/firebase"
import { Button } from "@/components/ui/button"
import Chatbot from "@/components/create-chatbot/chatbot"
import Data from "@/components/create-chatbot/data"
import Model from "@/components/create-chatbot/model"
import Properties from "@/components/create-chatbot/properties"
import { ChatbotStepsBox } from "@/components/create-chatbot/steps"
import Loader from "@/components/loader"

interface EditChatbotProps {
  session: Session
  chatbotid: string
}

export default function EditChatbot({ session, chatbotid }: EditChatbotProps) {
  const router = useRouter()

  const [chatbotDetails] = useDocumentData(doc(db, "chatbots", chatbotid))

  const dimageURL = chatbotDetails?.imageURL as string
  const dchatbotName = chatbotDetails?.chatbotName as string
  const dwelcomeMessage = chatbotDetails?.welcomeMessage as string
  const ddescription = chatbotDetails?.description as string
  const dsubject = chatbotDetails?.subject as string
  const dgrade = chatbotDetails?.grade as string
  const drubric = chatbotDetails?.rubric as string
  const dnamespace = chatbotDetails?.namespace as string
  const dindexName = chatbotDetails?.indexName as string
  const dtags = chatbotDetails?.tags as string
  const dprompt = chatbotDetails?.prompt as string

  const [isLoading, setIsLoading] = useState<boolean>(true)
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
  const [subject, setSubject] = useState<string>("")
  const [grade, setGrade] = useState<string>("")
  const [rubric, setRubric] = useState<string>("")

  useEffect(() => {
    if (dimageURL) setImagePreview(dimageURL)
    if (dchatbotName) setName(dchatbotName)
    if (dwelcomeMessage) setWelcomeMessage(dwelcomeMessage)
    if (ddescription) setWelcomeMessage(ddescription)
    if (dsubject) setSubject(dsubject)
    if (dgrade) setGrade(dgrade)
    if (drubric) setRubric(drubric)
    if (dnamespace) setNamespace(dnamespace)
    if (dindexName) setIndexName(dindexName)
    if (dtags) setTags(dtags)
    if (dprompt) setPrompt(dprompt)
  }, [
    dimageURL,
    dchatbotName,
    dwelcomeMessage,
    ddescription,
    dsubject,
    dgrade,
    drubric,
    dnamespace,
    dindexName,
    dtags,
    dprompt,
  ])

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
      window.scrollTo(0, 0)
    }
  }

  const editChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) {
      toast.warning("Please enter a name for your chatbot.")
    } else if (name.length < 3) {
      toast.warning("Name must be at least 3 characters long.")
    } else if (!welcomeMessage) {
      toast.warning("Please enter a welcome message for your chatbot.")
    } else if (welcomeMessage.length < 3) {
      toast.warning("Welcome message must be at least 3 characters long.")
    } else if (!subject) {
      toast.warning("Please select a subject.")
    } else if (!grade) {
      toast.warning("please select a grade.")
    } else if (!prompt && !namespace) {
      console.log(prompt, namespace)
      toast.error(
        "Either uploaded document or prompt is required to edit a chatbot."
      )
    } else
      try {
        setLoading(true)

        const docRef = doc(db, "chatbots", chatbotid)

        await updateDoc(docRef, {
          chatbotName: name,
          imageURL: imagePreview,
          welcomeMessage: welcomeMessage,
          description: description,
          namespace: namespace,
          indexName: indexName,
          tags: tags,
          prompt: prompt,
          subject: subject,
          grade: grade,
          rubric: rubric,
          updatedBy: session?.user?.email!,
          updatedAt: serverTimestamp(),
        })
        setLoading(false)
        toast.success("Your chatbot has been edited.")
        router.push("/dashboard")
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
      <div className="grid grid-flow-col-dense grid-cols-7 space-y-8 pb-2 lg:space-x-4 lg:space-y-0">
        <div className="col-span-4">
          <div className="grid grid-flow-row grid-cols-4 gap-3">
            <div className="bg-secondary/50 col-span-4 rounded-lg">
              <form onSubmit={editChatbot}>
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
                      subject={subject}
                      setSubject={setSubject}
                      grade={grade}
                      setGrade={setGrade}
                      rubric={rubric}
                      setRubric={setRubric}
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
                      <Button
                        onClick={() => {
                          setActiveTab("properties")
                          window.scrollTo(0, 0)
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => {
                          setActiveTab("model")
                          window.scrollTo(0, 0)
                        }}
                      >
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
                          <Button
                            onClick={() => {
                              setActiveTab("data")
                              window.scrollTo(0, 0)
                            }}
                          >
                            Back
                          </Button>
                          <Button type="submit">Edit Chatbot</Button>
                        </div>
                      ) : (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Editing Chatbot...
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
