import {CheckEmailVerification} from "@/context/AuthContext";
export default function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return <CheckEmailVerification>{children}</CheckEmailVerification>
}