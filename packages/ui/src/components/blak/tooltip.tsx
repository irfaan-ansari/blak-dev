import {
  Tooltip as TooltipBase,
  TooltipTrigger,
  TooltipContent,
} from "@blak/ui/components/tooltip"

export const Tooltip = ({
  content,
  children,
  side = "top",
}: {
  content: React.ReactNode
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
}) => {
  return (
    <TooltipBase>
      <TooltipContent side={side}>{content}</TooltipContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
    </TooltipBase>
  )
}
