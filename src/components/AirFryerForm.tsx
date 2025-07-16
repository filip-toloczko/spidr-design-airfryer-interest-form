import { useState, type ChangeEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  costGuess: string;
  spidrPin: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  costGuess?: string;
  spidrPin?: string;
}

const SpidrAirFryerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    spidrPin: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Make sure the input is a clean number
  const handleCostChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      costGuess: value,
    }));
  };

  //Make sure the input is clean and format in chunks of 4
  const handlePinChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = value.match(/.{1,4}/g)?.join("-") || value;
    if (formattedValue.length <= 19) {
      setFormData((prev) => ({
        ...prev,
        spidrPin: formattedValue,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.costGuess.trim())
      newErrors.costGuess = "Cost guess is required";
    if (!formData.spidrPin.trim()) newErrors.spidrPin = "Spidr PIN is required";

    //Regex is just checking structure, not if domain exists
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    //remove the dashes in the pin
    const pinDigits = formData.spidrPin.replace(/[^0-9]/g, "");
    if (formData.spidrPin && pinDigits.length !== 16) {
      newErrors.spidrPin = "PIN must be exactly 16 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      console.log("Form Data:", {
        ...formData,
        costGuess: formData.costGuess ? `$${formData.costGuess}` : "",
        spidrPin: formData.spidrPin,
      });
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "#333", color: "#fff" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          style={{
            padding: "30px",
            backgroundColor: "rgba(71, 157, 175, 0.9)",
            marginBottom: "2rem",
            borderRadius: "0px",
          }}
        >
          <h1
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 200,
              fontSize: "35px",
              lineHeight: "39px",
              fontStyle: "normal",
              color: "rgb(255, 255, 255)",
              marginBottom: "1rem",
              textAlign: "center",
              borderBottom: "3px solid white",
              paddingBottom: "8px",

              display: "inline-block",
              maxWidth: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Reserve Your Spidr Air Fryer
          </h1>
          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 200,
              fontSize: "14px",
              lineHeight: "20px",
              fontStyle: "normal",
              color: "rgb(255, 255, 255)",
              textAlign: "center",
            }}
          >
            We are very excited to announce our brand new Spidr Design Air
            Fryer.
            <br />
            Please fill out the interest form below to get added to our
            waitlist.
          </p>
        </div>

        <div
          style={{
            padding: "2rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#fff",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "0px",
                    border: errors.firstName
                      ? "2px solid rgba(71, 157, 175, .9)"
                      : "2px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: errors.firstName
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  placeholder="Enter your first name"
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(71, 157, 175, 0.8)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      errors.firstName ? "#ef4444" : "rgba(255, 255, 255, 0.2)")
                  }
                />
                {errors.firstName && (
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div style={{ width: "100%", maxWidth: "400px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#fff",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "0px",
                    border: errors.lastName
                      ? "2px solid rgba(71, 157, 175, .9)"
                      : "2px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: errors.lastName
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  placeholder="Enter your last name"
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(71, 157, 175, 0.8)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      errors.lastName ? "#ef4444" : "rgba(255, 255, 255, 0.2)")
                  }
                />
                {errors.lastName && (
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#fff",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "0px",
                    border: errors.phone
                      ? "2px solid rgba(71, 157, 175, .9)"
                      : "2px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: errors.phone
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  placeholder="(123) 456-7890"
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(71, 157, 175, 0.8)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      errors.phone ? "#ef4444" : "rgba(255, 255, 255, 0.2)")
                  }
                />
                {errors.phone && (
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div style={{ width: "100%", maxWidth: "400px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#fff",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "0px",
                    border: errors.email
                      ? "2px solid rgba(71, 157, 175, .9)"
                      : "2px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: errors.email
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  placeholder="your@email.com"
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(71, 157, 175, 0.8)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      errors.email ? "#ef4444" : "rgba(255, 255, 255, 0.2)")
                  }
                />
                {errors.email && (
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#fff",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Air Fryer Cost Guess
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  ></span>
                  <input
                    type="text"
                    name="costGuess"
                    value={formData.costGuess}
                    onChange={handleCostChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",

                      paddingTop: "12px",
                      paddingBottom: "12px",
                      borderRadius: "0px",
                      border: errors.costGuess
                        ? "2px solid rgba(71, 157, 175, .9)"
                        : "2px solid rgba(255, 255, 255, 0.2)",
                      backgroundColor: errors.costGuess
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    placeholder="$$$"
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor =
                        "rgba(71, 157, 175, 0.8)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor =
                        errors.costGuess
                          ? "#ef4444"
                          : "rgba(255, 255, 255, 0.2)")
                    }
                  />
                </div>
                {errors.costGuess && (
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    {errors.costGuess}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#fff",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Very, Very Secret 16-Digit Spidr PIN
                </label>
                <input
                  type="text"
                  name="spidrPin"
                  value={formData.spidrPin}
                  onChange={handlePinChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "0px",
                    border: errors.spidrPin
                      ? "2px solid rgba(71, 157, 175, .9)"
                      : "2px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: errors.spidrPin
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  placeholder="####-####-####-####"
                  maxLength={19}
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(71, 157, 175, 0.8)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      errors.spidrPin ? "#ef4444" : "rgba(255, 255, 255, 0.2)")
                  }
                />
                {errors.spidrPin && (
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    {errors.spidrPin}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  display: "inline-block",
                  padding: "12px 40px",
                  fontSize: "1.1rem",
                  fontWeight: "400",
                  fontFamily: "Raleway, sans-serif",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "2px solid #fff",
                  borderRadius: "0px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.borderColor = "rgba(71, 157, 175, 0.9)";
                  target.style.color = "rgba(71, 157, 175, 0.9)";
                  target.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.borderColor = "#fff";
                  target.style.color = "#fff";
                  target.style.backgroundColor = "transparent";
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpidrAirFryerForm;
