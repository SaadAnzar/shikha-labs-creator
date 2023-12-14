"use client"

import React, { useEffect, useState } from "react"
import { FileText, Loader2, Upload } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

function generateID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let id = ""
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters.charAt(randomIndex)
  }
  return id
}

interface DataProps {
  namespace: string
  setNamespace: React.Dispatch<React.SetStateAction<string>>
  indexName: string
  setIndexName: React.Dispatch<React.SetStateAction<string>>
  tags: string
  setTags: React.Dispatch<React.SetStateAction<string>>
}

const Data = ({
  namespace,
  setNamespace,
  indexName,
  setIndexName,
  tags,
  setTags,
}: DataProps) => {
  const [file, setFile] = useState<File>()

  const [loading, setLoading] = useState<boolean>(false)
  const [hide, setHide] = useState<boolean>(false)
  const [dragging, setDragging] = useState<boolean>(false)

  const [url, setUrl] = useState<string>("")
  const [urlLoading, setUrlLoading] = useState<boolean>(false)
  const [urlHide, setUrlHide] = useState<boolean>(false)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files[0]
    setFile(file)
  }

  const handleDataChange = (event: any) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
  }

  const handleDataUpload = async () => {
    const uuid = generateID()
    setNamespace(uuid)

    const formData = new FormData()
    formData.append("file", file as Blob)

    try {
      setLoading(true)
      const res = await fetch(
        `https://langchainchatbot-64e6d01e9116.herokuapp.com/PDUpload?namespace=${uuid}`,
        {
          method: "POST",
          body: formData,
        }
      )
      if (res.status === 422) {
        toast.warning("Please select a file to upload.")
        setLoading(false)
        return
      }
      const body = await res.json()
      const indexName = body.index_name
      setIndexName(indexName)
      setLoading(false)
      toast.success("Document uploaded successfully.")
      setHide(true)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(
        `Error uploading document.\n
        Please try by creating another PDF file by copy pasting contents into a new file`
      )
    }
  }

  useEffect(() => {
    if (file) handleDataUpload()
  }, [file])

  const handleURLUpload = async (e: any) => {
    e.preventDefault()

    const uid = generateID()
    setNamespace(uid)

    try {
      setUrlLoading(true)
      const res = await fetch(
        `https://langchainchatbot-64e6d01e9116.herokuapp.com/YTUpload?video_url=${url}&namespace=${uid}`,
        {
          method: "POST",
        }
      )
      if (res.status === 422) {
        toast.error("Please enter a valid URL.")
        setUrlLoading(false)
        return
      }
      const body = await res.json()
      const indexName = body.index_name
      setIndexName(indexName)
      setUrlLoading(false)
      toast.success("Video URL uploaded successfully.")
      setUrlHide(true)
    } catch (error) {
      console.log(error)
      setUrlLoading(false)
      toast.error(`Error uploading Video URL.\n
        Please try again.`)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-6 pt-4 text-2xl font-semibold">Data Management</h1>

      <Card className="mx-5">
        <CardHeader className="pb-4">
          <CardTitle className="tracking-normal">Upload Document</CardTitle>
          <CardDescription className="text-primary/60 text-sm leading-5">
            Upload a document to the bot which will act as the knowledge base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4">
            <Label htmlFor="data" className="cursor-pointer">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                {...(!hide && { onDrop: handleDrop })}
                className={cn(
                  loading ? "disabled cursor-not-allowed" : "",
                  dragging
                    ? "disabled cursor-not-allowed border-2 border-zinc-400 bg-zinc-300 p-4 "
                    : "",
                  hide || urlHide
                    ? "disabled cursor-not-allowed bg-zinc-200"
                    : "",
                  "flex h-52 flex-col items-center justify-center rounded-lg border-2 p-2"
                )}
              >
                {file ? (
                  <FileText className="h-6 w-6" />
                ) : (
                  <Upload className="h-6 w-6" />
                )}
                <h2 className="mt-2 font-bold">
                  {hide
                    ? "Uploaded"
                    : dragging
                    ? "Drop here"
                    : file?.name || "Drag or click to upload files"}
                </h2>
              </div>
            </Label>
            <Input
              type="file"
              id="data"
              accept=".pdf"
              disabled={hide || urlHide}
              onChange={handleDataChange}
              className="hidden"
            />
            <p className="my-2 flex justify-center font-medium">
              {file?.name || "No file selected"}
            </p>

            <div className="p-4 text-center">
              {!loading ? (
                <Button
                  disabled={hide || urlHide}
                  className="w-full"
                  onClick={handleDataUpload}
                >
                  {!hide ? "Upload" : "Uploaded"}
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="pb-4">
          <CardTitle className="tracking-normal">YouTube Video URL</CardTitle>
          <CardDescription className="text-primary/60 text-sm leading-5">
            Upload a YT video URL to the bot which will act as the knowledge
            base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4">
            <Input
              id="url"
              type="text"
              value={url}
              disabled={hide || urlHide}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Please enter YT Video URL for your data"
              className="shadow-sm"
            />
            <div className="p-4 pt-8 text-center">
              {!urlLoading ? (
                <Button
                  disabled={hide || urlHide}
                  className="w-full"
                  onClick={handleURLUpload}
                >
                  {!urlHide ? "Upload" : "Uploaded"}
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading URL
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="pb-4">
          <CardTitle className="tracking-normal">
            Tags
            <span className="text-primary/40 ml-3 text-sm font-medium">
              (Optional)
            </span>
          </CardTitle>
          <CardDescription className="text-primary/60 text-sm leading-5">
            Add tags to your data like &quot;Chatbot, GPT-3&quot;.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Please enter tags for your data"
            className="shadow-sm"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Data
