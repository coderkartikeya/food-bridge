import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/services/auth-service";
import { Heading, Text, Button, Icon, Input } from "@components/export/index";
import loginImage from "../../assets/loginImage.png";

const SignupPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "VOLUNTEER",
    phoneNumber: "",
    latitude: 0,
    longitude: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to retrieve location. Using default data.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        latitude: parseFloat(formData.latitude as unknown as string),
        longitude: parseFloat(formData.longitude as unknown as string),
      });

      // Navigate to login after successful register
      navigate("/login");
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || error.response?.data?.error || "Registration failed. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-brand-primary text-white items-center justify-center px-10">
        <div className="max-w-md flex flex-col items-center text-center">
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-10 shadow-xl">
            <img src={loginImage} alt="Volunteers sorting food" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Icon name="leafCustom" size={28} />
            <Heading headingType="h2" className="text-2xl font-bold">FoodBridge</Heading>
          </div>
          <Heading headingType="h1" className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">
            Join the Movement.<br />Share the Surplus.
          </Heading>
          <Text fontSize="sm" fontColor="rgba(255,255,255,0.9)" className="leading-relaxed">
            Create an account to connect surplus food with those who need it most.
          </Text>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-12 overflow-y-auto max-h-screen">
        <div className="w-full max-w-md mx-auto flex flex-col pt-10">
          <Heading headingType="h2" className="text-2xl font-bold text-text-heading mb-1">
            Create an Account
          </Heading>
          <Text fontSize="sm" fontColor="var(--color-text-muted)" className="mb-6">
            Fill in the details below to complete your registration.
          </Text>

          {errorMsg && (
            <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="flex p-1 bg-gray-100 rounded-lg mb-6 flex-wrap gap-1">
            {["VOLUNTEER", "DONOR", "NGO", "ADMIN"].map((role) => (
              <Button
                buttonType="tertiary"
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`flex-1 py-2 px-1 text-xs font-semibold rounded-md transition ${formData.role === role ? "bg-white shadow text-text-heading" : "text-text-muted"}`}
              >
                {role}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Full Name</label>
              <Input
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Email Address</label>
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

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Phone Number</label>
              <Input
                name="phoneNumber"
                type="text"
                placeholder="+1234567890"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Password</label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password (min 8 chars)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-10"
                  minLength={8}
                  required
                />
                <Button
                  buttonType="tertiary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted px-0 py-0 font-normal hover:bg-transparent"
                >
                  <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold flex justify-between items-center">
                Location
                <Button
                  buttonType="tertiary"
                  type="button"
                  onClick={getLocation}
                  className="px-0 py-0 text-xs text-brand-primary font-semibold hover:bg-transparent hover:underline"
                >
                  Fetch Location
                </Button>
              </label>
              <div className="flex gap-2">
                <Input
                  name="latitude"
                  type="number"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  step="any"
                />
                <Input
                  name="longitude"
                  type="number"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  step="any"
                />
              </div>
            </div>

            <Button type="submit" buttonType="primary" disabled={isLoading} className="w-full py-3 text-base mt-2">
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <Text fontSize="sm" className="text-center mt-6">
            Already have an account? <Link to="/login" className="font-semibold text-brand-primary">Log in</Link>
          </Text>

          <div className="flex justify-center gap-6 mt-6 pb-6 text-xs text-text-disabled">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/help">Help</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
