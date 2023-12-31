"use client"

import Image from "next/image"
import { ImageIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface PropertiesProps {
  imagePreview: string
  setImagePreview: React.Dispatch<React.SetStateAction<string>>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  welcomeMessage: string
  setWelcomeMessage: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  subject: string
  setSubject: React.Dispatch<React.SetStateAction<string>>
  grade: string
  setGrade: React.Dispatch<React.SetStateAction<string>>
  rubric: string
  setRubric: React.Dispatch<React.SetStateAction<string>>
}

const Properties = ({
  imagePreview,
  setImagePreview,
  name,
  setName,
  welcomeMessage,
  setWelcomeMessage,
  description,
  setDescription,
  subject,
  setSubject,
  grade,
  setGrade,
  rubric,
  setRubric,
}: PropertiesProps) => {
  const handleImageUpload = (event: any) => {
    const selectedImage = event.target.files[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-6 pt-4 text-3xl font-semibold">Chatbot Properties</h1>

      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">
            Chatbot Icon
            <span className="text-primary/40 ml-3 text-sm font-medium">
              (Optional)
            </span>
          </CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Upload an image to use as your chatbot icon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-col-dense grid-cols-3 justify-between gap-5">
            <Input
              className="col-span-2"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
            />

            <div className="col-span-1">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Selected Image"
                  width={60}
                  height={60}
                  className="mx-auto rounded-full"
                />
              ) : (
                <ImageIcon
                  color="gray"
                  size={60}
                  className="border-ring bg-secondary/80 mx-auto rounded-2xl border-2 p-3"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">
            Chatbot Name
          </CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Name for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Please enter a name for your chatbot."
            className="shadow-sm"
          />
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">
            Welcome Message
          </CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Welcome message for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            placeholder="Hello, how can I help you today?"
            className="shadow-sm"
          />
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">
            Description
            <span className="text-primary/40 ml-3 text-sm font-medium">
              (Optional)
            </span>
          </CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Description for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please enter a description for your chatbot."
            className="shadow-sm"
          />
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">Subject</CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Subject for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={subject} onValueChange={(value) => setSubject(value)}>
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Subject</SelectLabel>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Urdu">Urdu</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Social Science">Social Science</SelectItem>
                <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="EVS">EVS</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">Grade</CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Grade for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={grade} onValueChange={(value) => setGrade(value)}>
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>Grade</SelectLabel>
                <SelectItem value="Grade 1">Grade 1</SelectItem>
                <SelectItem value="Grade 2">Grade 2</SelectItem>
                <SelectItem value="Grade 3">Grade 3</SelectItem>
                <SelectItem value="Grade 4">Grade 4</SelectItem>
                <SelectItem value="Grade 5">Grade 5</SelectItem>
                <SelectItem value="Grade 6">Grade 6</SelectItem>
                <SelectItem value="Grade 7">Grade 7</SelectItem>
                <SelectItem value="Grade 8">Grade 8</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mx-5">
        <CardHeader className="space-y-0 pb-4">
          <CardTitle className="text-xl tracking-normal">
            Rating Rubric
            <span className="text-primary/40 ml-3 text-sm font-medium">
              (Optional)
            </span>
          </CardTitle>
          <CardDescription className="text-primary/60 text-sm">
            Student rating rubric for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={rubric}
            onChange={(e) => setRubric(e.target.value)}
            placeholder="Please enter a rating rubric for your chatbot."
            className="shadow-sm"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Properties
