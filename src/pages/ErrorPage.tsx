/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { useRouteError } from "react-router-dom";

export default function RootError(): JSX.Element {
  const err = useRouteError() as RouteError;

  return (
    <div>
      <div>
        <strong>Error {err.status || 500}</strong>:{" "}
        {err.statusText ?? err.message}
      </div>
    </div>
  );
}

type RouteError = Error & { status?: number; statusText?: string };
