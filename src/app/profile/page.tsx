// app/profile/page.tsx
"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <Card className="w-full max-w-md rounded-lg bg-white shadow-md">
        <CardHeader>
          <div className="mt-4 flex items-center justify-center">
            <Image
              className="rounded-full"
              src="/path_to_your_profile_image.jpg" // Replace with your profile image
              alt="Profile Picture"
              width={100}
              height={100}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <h2 className="text-lg font-semibold">Esteban Aleman</h2>
          <p className="text-gray-600">
            Software Engineer | React, Next.js, TypeScript
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">
              Contact Information
            </h3>
            <p className="text-gray-500">Email: esteban@example.com</p>
            <p className="text-gray-500">Phone: +52 123 456 7890</p>
            {editMode && (
              <div className="mt-4">
                <input
                  className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Edit Name"
                />
                <input
                  className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="Edit Email"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-4">
          <Button variant="default" className="mr-2" onClick={handleEdit}>
            {editMode ? "Save" : "Edit Profile"}
          </Button>
          <Button variant="destructive">Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
