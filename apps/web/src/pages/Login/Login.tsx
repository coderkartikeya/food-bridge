/**
 * FoodBridge Authentication Page
 * Implements a split-screen layout for the login and signup flows.
 * Architecture:
 * 1. State Management: Controlled form inputs with centralized submission handling.
 * 2. Design System: Strictly utilizes atomic components (Heading, Text, Button, Icon, Input).
 * 3. Routing: Employs react-router-dom for client-side navigation.
 * 4. Accessibility: Implements proper form labeling and ARIA standards.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Button, Icon, Input } from "@components/export/index";
import loginImage from "../../assets/loginImage.png";



const LoginPage = () => {
  const [loginType, setLoginType] = useState<"restaurant" | "volunteer">("restaurant");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT PANEL */}
      <div className="
        hidden lg:flex
        lg:w-1/2
        bg-brand-primary
        text-white
        items-center
        justify-center
        px-10
      ">
        <div className="max-w-md flex flex-col items-center text-center">

          {/* IMAGE */}
          <div className="
            w-full
            aspect-[4/3]
            rounded-3xl
            overflow-hidden
            mb-10
            shadow-xl
          ">
            <img
              src={loginImage}
              alt="Volunteers sorting food"
              className="w-full h-full object-cover"
            />
          </div>

          {/* BRAND */}
          <div className="flex items-center gap-2 mb-6">
            <Icon name="leafCustom" size={28} />
            <Heading headingType="h2" className="text-2xl font-bold">
              FoodBridge
            </Heading>
          </div>

          {/* HERO TEXT */}
          <Heading
            headingType="h1"
            className="
              text-3xl
              xl:text-4xl
              font-bold
              mb-4
              leading-tight
            "
          >
            1 in 3 meals are wasted.
            <br />
            Help us change that.
          </Heading>

          <Text
            fontSize="sm"
            fontColor="rgba(255,255,255,0.9)"
            className="leading-relaxed"
          >
            Join a community connecting surplus food with those who need it most.
          </Text>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="
        flex
        flex-col
        justify-center
        w-full
        lg:w-1/2
        px-6
        sm:px-10
        lg:px-16
        py-12
      ">

        <div className="w-full max-w-md mx-auto flex flex-col">

          {/* TITLE */}
          <Heading
            headingType="h2"
            className="
              text-2xl
              font-bold
              text-text-heading
              mb-1
            "
          >
            Welcome Back
          </Heading>

          <Text
            fontSize="sm"
            fontColor="var(--color-text-muted)"
            className="mb-6"
          >
            Please enter your details to access your account.
          </Text>

          {/* LOGIN TYPE SWITCH */}
          <div className="
            flex
            p-1
            bg-gray-100
            rounded-lg
            mb-6
          ">
            <button
              type="button"
              onClick={() => setLoginType("restaurant")}
              className={`
                flex-1
                py-2
                text-sm
                font-semibold
                rounded-md
                transition
                ${loginType === "restaurant"
                  ? "bg-white shadow text-text-heading"
                  : "text-text-muted"}
              `}
            >
              Restaurant
            </button>

            <button
              type="button"
              onClick={() => setLoginType("volunteer")}
              className={`
                flex-1
                py-2
                text-sm
                font-semibold
                rounded-md
                transition
                ${loginType === "volunteer"
                  ? "bg-white shadow text-text-heading"
                  : "text-text-muted"}
              `}
            >
              Volunteer
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col gap-4"
          >

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Email Address
              </label>

              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1">

              <label className="text-sm font-semibold">
                Password
              </label>

              <div className="relative">

                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-text-muted
                  "
                >
                  <Icon
                    name={showPassword ? "eyeOff" : "eye"}
                    size={18}
                  />
                </button>

              </div>

            </div>

            {/* REMEMBER */}
            <div className="
              flex
              items-center
              justify-between
              text-sm
            ">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="
                  font-semibold
                  text-brand-primary
                "
              >
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              buttonType="primary"
              className="
                w-full
                py-3
                text-base
              "
            >
              Log In
            </Button>

          </form>

          {/* DIVIDER */}
          <div className="
            flex
            items-center
            gap-3
            my-6
          ">
            <div className="flex-1 h-px bg-border-subtle" />

            <Text
              fontSize="xs"
              fontWeight="bold"
              fontColor="var(--color-text-disabled)"
              className="uppercase"
            >
              Or continue with
            </Text>

            <div className="flex-1 h-px bg-border-subtle" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="
              w-full
              py-3
              flex
              items-center
              justify-center
              gap-3
              border
              rounded-lg
              font-semibold
              hover:bg-gray-50
            "
          >
            Sign in with Google
          </button>

          {/* SIGNUP */}
          <Text
            fontSize="sm"
            className="
              text-center
              mt-6
            "
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="
                font-semibold
                text-brand-primary
              "
            >
              Sign up
            </Link>
          </Text>

          {/* FOOTER */}
          <div className="
            flex
            justify-center
            gap-6
            mt-10
            text-xs
            text-text-disabled
          ">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/help">Help</Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;