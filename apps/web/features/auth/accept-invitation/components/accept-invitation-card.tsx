"use client"

import React from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { redirect, useParams } from "next/navigation"
import { useInvitation } from "./invitation.data"
import { Button } from "@blak/ui/components/button"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { ErrorState, PageSkeleton } from "@blak/ui/components/blak/empty-state"
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CircleUser,
  Loader2,
} from "lucide-react"
import { authClient } from "@blak/auth/client"
import { toast } from "sonner"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"

export const AcceptInvitationCard = () => {
  const params = useParams<{ id: string }>()
  const { open } = useAppDialog()

  const [loading, setLoading] = React.useState(false)

  const { data: session, isPending: sessionPending } = authClient.useSession()
  const { data, isPending, isError, error } = useInvitation(params.id ?? "")

  if (isPending || sessionPending) {
    return <PageSkeleton />
  }

  // no session redirect to signin
  if (!session) {
    redirect(`/auth/signin?callbackURL=/auth/accept-invitation/${params.id}`)
  }

  // logged in show error
  if (isError) {
    return <ErrorState title={error.message} />
  }

  const handleAccept = async () => {
    setLoading(true)
    const { error } = await authClient.organization.acceptInvitation({
      invitationId: params.id,
    })
    if (error) {
      toast.error(error.message)
    } else {
      open({
        variant: "success",
        title: "Welcome Aboard",
        description: `You've successfully joined the Blak. Your account is now ready.`,
        action: {
          label: "Continue to Dashboard",
          onClick: () => {
            window.location.href = "http://localhost:3002"
          },
        },
        cancel: {
          label: "Maybe Later",
        },
      })
    }
    setLoading(false)
  }

  const handleReject = async () => {
    open({
      variant: "warning",
      title: "Reject Invitation?",
      description:
        "Are you sure you want to reject this invitation? You will lose access to join this BLAK through this invitation.",
      action: {
        label: "Reject Invitation",
        onClick: async () => {
          const { error } = await authClient.organization.rejectInvitation({
            invitationId: params.id,
          })
          if (error) {
            toast.error(error.message)
          } else {
            window.location.href = "/"
          }
        },
      },
      cancel: { label: "Keep Invitation" },
    })
  }

  return (
    <Card className="w-full max-w-lg py-12">
      <CardHeader className="flex justify-center">
        <Image src="/logo/logo.png" alt="BLAK" width={120} height={40} />
      </CardHeader>
      <CardHeader className="px-12 text-center">
        <CardTitle className="text-xl font-bold">Accept Invitation</CardTitle>
        <CardDescription>
          {/* @ts-ignore */}
          You have been invited to join BLAK {data?.userRole}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 px-12 text-center">
        <Avatar>
          <AvatarFallback>
            <CircleUser className="size-4" />
          </AvatarFallback>
        </Avatar>
        <ArrowDown className="size-4 text-muted-foreground" />
        <Button variant="ghost" className="rounded-full pl-1.5">
          <Avatar>
            <AvatarFallback>
              <Building2 className="size-4" />
            </AvatarFallback>
          </Avatar>
          <span>Lorem Ipsum Company</span>
        </Button>
      </CardContent>
      <CardContent className="px-12">
        <Button
          className="w-full justify-between"
          disabled={loading}
          suffix={<ArrowRight />}
          onClick={handleAccept}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Accept"}
        </Button>
      </CardContent>
      <CardFooter className="px-12">
        <Button
          type="button"
          variant="secondary"
          className="w-full justify-between"
          onClick={handleReject}
          suffix={<ArrowRight />}
        >
          Reject
        </Button>
      </CardFooter>
    </Card>
  )
}
