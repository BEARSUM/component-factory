import React, { useEffect } from 'react'

type TDropdownMenu = {
  children: React.ReactNode
  className?: string
  asChild?: true
  onClick?: () => void
  showStatusBar?: boolean
  toggleStatusBar?: (event: React.MouseEvent) => void
  href?: string
  menuRef?: React.RefObject<HTMLDivElement>
  buttonRef?: React.RefObject<HTMLDivElement> // trigger에 button태그 or 버튼 컴포넌트가 오게 될 경우 에러 발생 방지를 위해 HTMLDivElement 사용함.
}

export function DropdownMenu({ children }: TDropdownMenu) {
  return <div className="relative">{children}</div>
}

export function DropdownMenuTrigger({ children, toggleStatusBar, buttonRef }: TDropdownMenu) {
  return (
    <div ref={buttonRef} onClick={toggleStatusBar} className="hover:cursor-pointer">
      {children}
    </div>
  )
}

export function DropdownMenuContent({ children, showStatusBar, toggleStatusBar, menuRef, buttonRef }: TDropdownMenu) {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef?.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef?.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      toggleStatusBar?.(event as unknown as React.MouseEvent)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return showStatusBar ? (
    <div
      ref={menuRef}
      className="absolute flex flex-col border rounded-lg shadow-md bg-background mt-1 w-auto p-1 z-50"
    >
      {children}
    </div>
  ) : null
}

export function DropdownMenuLabel({ children }: TDropdownMenu) {
  return <label className="flex items-center justify-center py-2 border-b text-sm">{children}</label>
}

export function DropdownMenuItem({ children, href }: TDropdownMenu) {
  return (
    <>
      {href ? (
        <a
          className="flex p-2 text-sm text-foreground cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          href={href}
        >
          {children}
        </a>
      ) : (
        <div className="flex p-2 text-sm text-foreground cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          {children}
        </div>
      )}
    </>
  )
}
