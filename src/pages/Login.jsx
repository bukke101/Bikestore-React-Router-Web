import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
export async function action({ request }) {
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/admin";
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in</h1>
      {errorMessage && <h4 className="red">{errorMessage}</h4>}
      {message && <h3 className="red">{message}</h3>}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
