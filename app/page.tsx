"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Settings } from "lucide-react"

interface FormData {
  // New fields for name, birthday, location
  fullName: string
  birthday: string
  location: string
  // Existing fields...
  nickname: string
  socials: string
  relationshipStatus: string
  favouriteSlang: string
  hobbies: string
  favouriteCourse: string
  favouriteLecturer: string
  challengingCourse: string
  bestLevel: string
  toughestLevel: string
  memorableMoment: string
  worstMoment: string
  missAboutRectem: string
  quotesAdvice: string
  ifNotComSci: string
}

// TEXT POSITIONING CONFIGURATION - Edit these values to adjust text positions on template
interface TextPosition {
  x: number
  y: number
  fontSize: number
  maxWidth: number
}

interface TextPositions {
  [key: string]: TextPosition
}

export default function DPCreator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null)
  const [profileImage, setProfileImage] = useState<HTMLImageElement | null>(null)
  const [showPositions, setShowPositions] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    // New fields
    fullName: "",
    birthday: "",
    location: "",
    // Existing fields...
    nickname: "",
    socials: "",
    relationshipStatus: "",
    favouriteSlang: "",
    hobbies: "",
    favouriteCourse: "",
    favouriteLecturer: "",
    challengingCourse: "",
    bestLevel: "",
    toughestLevel: "",
    memorableMoment: "",
    worstMoment: "",
    missAboutRectem: "",
    quotesAdvice: "",
    ifNotComSci: "",
  })

  // TEXT POSITIONS - Modify these coordinates to position text on your template
  const [textPositions, setTextPositions] = useState<TextPositions>({
    // Name, birthday, location - positioned below the frame
    fullName: { x: 705, y: 2879, fontSize: 150, maxWidth: 750 }, // X changed to 705 for centering
    birthday: { x: 531, y: 3273, fontSize: 150, maxWidth: 600 },
    location: { x: 509, y: 3530, fontSize: 153, maxWidth: 500 },

    // Form fields - positioned in the blue areas on the right
    nickname: { x: 1900, y: 314, fontSize: 65, maxWidth: 780 },
    socials: { x: 1876, y: 533, fontSize: 65, maxWidth: 1000 },
    relationshipStatus: { x: 2211, y: 744, fontSize: 65, maxWidth: 1000 },
    favouriteSlang: { x: 2095, y: 953, fontSize: 65, maxWidth: 1600 },
    hobbies: { x: 2133, y: 1165, fontSize: 65, maxWidth: 1600 },
    favouriteCourse: { x: 2122, y: 1393, fontSize: 65, maxWidth: 1000 },
    favouriteLecturer: { x: 2179, y: 1605, fontSize: 65, maxWidth: 1980 },
    challengingCourse: { x: 2322, y: 1818, fontSize: 65, maxWidth: 1000 },
    bestLevel: { x: 1953, y: 2033, fontSize: 65, maxWidth: 230 },
    toughestLevel: { x: 2900, y: 2024, fontSize: 65, maxWidth: 230 },
    memorableMoment: { x: 1637, y: 2300, fontSize: 65, maxWidth: 1600 },
    worstMoment: { x: 1637, y: 2626, fontSize: 65, maxWidth: 1600 },
    missAboutRectem: { x: 2534, y: 2879, fontSize: 65, maxWidth: 750 },
    quotesAdvice: { x: 1637, y: 3154, fontSize: 65, maxWidth: 1600},
    ifNotComSci: { x: 2225, y: 3417, fontSize: 65, maxWidth: 3600 },
  })

  // Load the new PNG template on component mount
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setBaseImage(img)
    }
    // Updated to use your new PNG template
    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CS%20FYB%20template%20main-bJiKnGOvq8IpjW09rqmdmhUQnJqQHx.png"
  }, [])

  // Redraw canvas whenever images or form data changes
  useEffect(() => {
    if (baseImage) {
      drawCanvas()
    }
  }, [baseImage, profileImage, formData, textPositions])

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          setProfileImage(img)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Update text position for a specific field
  const handlePositionChange = (field: string, property: keyof TextPosition, value: number) => {
    setTextPositions((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [property]: value,
      },
    }))
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !baseImage) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match template
    canvas.width = baseImage.width
    canvas.height = baseImage.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // DRAW PROFILE PICTURE FIRST (behind the base image)
    if (profileImage) {
      // Coordinates for the inside of the ornate frame
      const profileArea = {
        x: 100, // Left edge inside frame
        y: 1130, // Top edge inside frame
        width: 1210, // Inner width of frame
        height: 1390, // Inner height of frame
      }

      // Scale image to fit the frame while maintaining aspect ratio
      const scaleX = profileArea.width / profileImage.width
      const scaleY = profileArea.height / profileImage.height
      const scale = Math.max(scaleX, scaleY) // Fill the entire frame

      const scaledWidth = profileImage.width * scale
      const scaledHeight = profileImage.height * scale

      // Center the image in the frame area
      const offsetX = profileArea.x + (profileArea.width - scaledWidth) / 2
      const offsetY = profileArea.y + (profileArea.height - scaledHeight) / 2

      // Draw profile image without clipping (it will be behind the frame)
      ctx.drawImage(profileImage, offsetX, offsetY, scaledWidth, scaledHeight)
    }

    // DRAW BASE TEMPLATE ON TOP (this will overlay the profile picture)
    ctx.drawImage(baseImage, 0, 0)

    // DRAW TEXT OVERLAYS on top of everything
    drawTextOverlays(ctx)
  }

  const drawTextOverlays = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000000" // Text color - change this to modify text color
    // Define a color for fields that should be white
  const whiteTextFields = ["fullName", "birthday", "location"]

    // Map form data to text positions
    const textData = {
      // Name, birthday, location fields
      fullName: formData.fullName,
      birthday: formData.birthday,
      location: formData.location,
      // Form fields
      nickname: formData.nickname,
      socials: formData.socials,
      relationshipStatus: formData.relationshipStatus,
      favouriteSlang: formData.favouriteSlang,
      hobbies: formData.hobbies,
      favouriteCourse: formData.favouriteCourse,
      favouriteLecturer: formData.favouriteLecturer,
      challengingCourse: formData.challengingCourse,
      bestLevel: formData.bestLevel,
      toughestLevel: formData.toughestLevel,
      memorableMoment: formData.memorableMoment,
      worstMoment: formData.worstMoment,
      missAboutRectem: formData.missAboutRectem,
      quotesAdvice: formData.quotesAdvice,
      ifNotComSci: formData.ifNotComSci,
    }

    // Draw each text field at its configured position
    Object.entries(textData).forEach(([field, text]) => {
    if (text.trim() && textPositions[field]) {
      const pos = textPositions[field]

      // Set text alignment for fullName
        if (field === "fullName") {
          ctx.textAlign = "center"
        } else {
          ctx.textAlign = "left" // Default for other fields
        }

      ctx.font = `bolder ${pos.fontSize}px Consolas`

      // Set text color based on the field name
      if (whiteTextFields.includes(field)) {
        ctx.fillStyle = "#FFFFFF" // White color for specific fields
        ctx.font = `900`
      } else {
        ctx.fillStyle = "#000000" // Black color for all other fields
      }

      // Capitalize fullName if it's the fullName field
        const displayText = field === "fullName" ? text.toUpperCase() : text;

      drawWrappedText(ctx, displayText, pos.x, pos.y, pos.maxWidth, pos.fontSize + 4)
    }
    })
  }

  // Helper function to wrap text within specified width
  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ): number => {
    const words = text.split(" ")
    let line = ""
    let currentY = y

    words.forEach((word) => {
      const testLine = line + word + " "
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line.trim(), x, currentY)
        line = word + " "
        currentY += lineHeight
      } else {
        line = testLine
      }
    })

    if (line.trim()) {
      ctx.fillText(line.trim(), x, currentY)
      currentY += lineHeight
    }

    return currentY
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "cs-fyb-dp.png"
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()
  }

  // Position control component for each field
  const PositionControls = ({ field, label }: { field: string; label: string }) => {
    if (!textPositions[field]) return null

    return (
      <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 rounded text-xs">
        <div>
          <Label className="text-xs">X</Label>
          <Input
            type="number"
            value={textPositions[field].x}
            onChange={(e) => handlePositionChange(field, "x", Number.parseInt(e.target.value) || 0)}
            className="h-6 text-xs"
          />
        </div>
        <div>
          <Label className="text-xs">Y</Label>
          <Input
            type="number"
            value={textPositions[field].y}
            onChange={(e) => handlePositionChange(field, "y", Number.parseInt(e.target.value) || 0)}
            className="h-6 text-xs"
          />
        </div>
        <div>
          <Label className="text-xs">Size</Label>
          <Input
            type="number"
            value={textPositions[field].fontSize}
            onChange={(e) => handlePositionChange(field, "fontSize", Number.parseInt(e.target.value) || 12)}
            className="h-6 text-xs"
          />
        </div>
        <div>
          <Label className="text-xs">Width</Label>
          <Input
            type="number"
            value={textPositions[field].maxWidth}
            onChange={(e) => handlePositionChange(field, "maxWidth", Number.parseInt(e.target.value) || 100)}
            className="h-6 text-xs"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CS FYB DP Creator</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - DP Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>DP Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Profile Picture Upload */}
                  <div>
                    <Label htmlFor="profile-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Profile Picture
                      </div>
                    </Label>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileUpload}
                    />
                  </div>

                  {/* Canvas Preview */}
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <canvas ref={canvasRef} className="max-w-full h-auto" style={{ maxHeight: "600px" }} />
                  </div>

                  {/* Control Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    {/*<Button onClick={() => setShowPositions(!showPositions)} variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      {showPositions ? "Hide" : "Show"} Positions
                    </Button>*/}
                    <Button onClick={downloadImage} size="lg">
                      <Download className="w-5 h-5 mr-2" />
                      Download DP
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Form */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* New fields for name, birthday, location */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold mb-3">Basic Information</h3>

                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                    {showPositions && <PositionControls field="fullName" label="Full Name" />}
                  </div>

                  <div>
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input
                      id="birthday"
                      value={formData.birthday}
                      onChange={(e) => handleInputChange("birthday", e.target.value)}
                      placeholder="e.g., Oct24"
                    />
                    {showPositions && <PositionControls field="birthday" label="Birthday" />}
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter your location"
                    />
                    {showPositions && <PositionControls field="location" label="Location" />}
                  </div>
                </div>

                {/* Existing form fields */}
                <div>
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange("nickname", e.target.value)}
                    placeholder="Enter your nickname"
                  />
                  {showPositions && <PositionControls field="nickname" label="Nickname" />}
                </div>

                <div>
                  <Label htmlFor="socials">Socials</Label>
                  <Input
                    id="socials"
                    value={formData.socials}
                    onChange={(e) => handleInputChange("socials", e.target.value)}
                    placeholder="Your social media handles"
                  />
                  {showPositions && <PositionControls field="socials" label="Socials" />}
                </div>

                <div>
                  <Label htmlFor="relationship">Relationship Status</Label>
                  <Input
                    id="relationship"
                    value={formData.relationshipStatus}
                    onChange={(e) => handleInputChange("relationshipStatus", e.target.value)}
                    placeholder="Your relationship status"
                  />
                  {showPositions && <PositionControls field="relationshipStatus" label="Relationship Status" />}
                </div>

                <div>
                  <Label htmlFor="slang">Favourite Slang</Label>
                  <Input
                    id="slang"
                    value={formData.favouriteSlang}
                    onChange={(e) => handleInputChange("favouriteSlang", e.target.value)}
                    placeholder="Your favourite slang"
                  />
                  {showPositions && <PositionControls field="favouriteSlang" label="Favourite Slang" />}
                </div>

                <div>
                  <Label htmlFor="hobbies">Hobbies/Interest</Label>
                  <Input
                    id="hobbies"
                    value={formData.hobbies}
                    onChange={(e) => handleInputChange("hobbies", e.target.value)}
                    placeholder="Your hobbies and interests"
                  />
                  {showPositions && <PositionControls field="hobbies" label="Hobbies/Interest" />}
                </div>

                <div>
                  <Label htmlFor="course">Favourite Course</Label>
                  <Input
                    id="course"
                    value={formData.favouriteCourse}
                    onChange={(e) => handleInputChange("favouriteCourse", e.target.value)}
                    placeholder="Your favourite course"
                  />
                  {showPositions && <PositionControls field="favouriteCourse" label="Favourite Course" />}
                </div>

                <div>
                  <Label htmlFor="lecturer">Favourite Lecturer</Label>
                  <Input
                    id="lecturer"
                    value={formData.favouriteLecturer}
                    onChange={(e) => handleInputChange("favouriteLecturer", e.target.value)}
                    placeholder="Your favourite lecturer"
                  />
                  {showPositions && <PositionControls field="favouriteLecturer" label="Favourite Lecturer" />}
                </div>

                <div>
                  <Label htmlFor="challenging">Most Challenging Course</Label>
                  <Input
                    id="challenging"
                    value={formData.challengingCourse}
                    onChange={(e) => handleInputChange("challengingCourse", e.target.value)}
                    placeholder="Most challenging course"
                  />
                  {showPositions && <PositionControls field="challengingCourse" label="Most Challenging Course" />}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="best-level">Best Level</Label>
                    <Input
                      id="best-level"
                      value={formData.bestLevel}
                      onChange={(e) => handleInputChange("bestLevel", e.target.value)}
                      placeholder="Best level"
                    />
                    {showPositions && <PositionControls field="bestLevel" label="Best Level" />}
                  </div>
                  <div>
                    <Label htmlFor="toughest-level">Toughest Level</Label>
                    <Input
                      id="toughest-level"
                      value={formData.toughestLevel}
                      onChange={(e) => handleInputChange("toughestLevel", e.target.value)}
                      placeholder="Toughest level"
                    />
                    {showPositions && <PositionControls field="toughestLevel" label="Toughest Level" />}
                  </div>
                </div>

                <div>
                  <Label htmlFor="memorable">Most Memorable Moment in School</Label>
                  <Textarea
                    id="memorable"
                    value={formData.memorableMoment}
                    onChange={(e) => handleInputChange("memorableMoment", e.target.value)}
                    placeholder="Share your most memorable moment"
                    rows={3}
                  />
                  {showPositions && <PositionControls field="memorableMoment" label="Most Memorable Moment" />}
                </div>

                <div>
                  <Label htmlFor="worst">Worst Moment in School</Label>
                  <Textarea
                    id="worst"
                    value={formData.worstMoment}
                    onChange={(e) => handleInputChange("worstMoment", e.target.value)}
                    placeholder="Share your worst moment"
                    rows={3}
                  />
                  {showPositions && <PositionControls field="worstMoment" label="Worst Moment" />}
                </div>

                <div>
                  <Label htmlFor="miss">What Will You Miss About RECTEM</Label>
                  <Input // Changed from Textarea to Input
                    id="miss"
                    value={formData.missAboutRectem}
                    onChange={(e) => handleInputChange("missAboutRectem", e.target.value)}
                    placeholder="What will you miss about RECTEM?"
                    // Removed the 'rows' prop as it's not applicable to Input
                  />
                  {showPositions && <PositionControls field="missAboutRectem" label="Miss About RECTEM" />}
                </div>

                <div>
                  <Label htmlFor="quotes">Quotes and Advice for Colleagues</Label>
                  <Textarea
                    id="quotes"
                    value={formData.quotesAdvice}
                    onChange={(e) => handleInputChange("quotesAdvice", e.target.value)}
                    placeholder="Share quotes and advice"
                    rows={3}
                  />
                  {showPositions && <PositionControls field="quotesAdvice" label="Quotes and Advice" />}
                </div>

                <div>
                  <Label htmlFor="alternative">If Not Com Sci Then?</Label>
                  <Input
                    id="alternative"
                    value={formData.ifNotComSci}
                    onChange={(e) => handleInputChange("ifNotComSci", e.target.value)}
                    placeholder="What would you study instead?"
                  />
                  {showPositions && <PositionControls field="ifNotComSci" label="If Not Com Sci" />}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
