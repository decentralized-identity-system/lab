'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Guardians() {
  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Guardians</h3>
        <p className="text-sm">Manage Smart Wallet Guardians to help recover your account.</p>
      </div>
      <Tabs defaultValue="add-guardian">
        <TabsList className="w-full flex items-center p-2 bg-transparent mb-4">
          <TabsTrigger className="flex-1" value="add-guardian">
            Add
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="remove-guardian">
            Remove
          </TabsTrigger>
        </TabsList>
        <div className="card">
          <TabsContent value="add-guardian">Add Guardians Form</TabsContent>
          <TabsContent value="remove-guardian">Remove Guardians Form</TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
