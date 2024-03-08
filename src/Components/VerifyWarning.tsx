"use client";

import { Button, Alert } from "evergreen-ui";
import Link from "next/link";

interface VerifyWarningProps {
  href: string;
}

export const VerifyWarning = ({ href }: VerifyWarningProps) => {
  return (
    <Alert
      intent="warning"
      title="Akun belum terverifikasi"
      marginBottom={16}
      marginTop={16}
    >
      <div className="py-5">
        <p>
          Akun anda belum terverifikasi sebagai student. Silahkan verifikasi
          akun sensus anda dengan email student anda untuk mengakses fitur
          lainnya.
        </p>
        <Link href={href}>
          <Button
            className="mt-3 w-full bg-white"
            appearance="default"
            onClick={() => console.log("Verifikasi")}
          >
            Verifikasi disini
          </Button>
        </Link>
      </div>
    </Alert>
  );
};
