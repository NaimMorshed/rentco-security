import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/styles/Phone.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Phone() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [authentication, setAuthentication] = useContext(UserContext);
  const navigate = useNavigate();

  const checkUserExistence = async() => {
    const response = await fetch(`http://localhost:5000/users/phone/${ph}`);
    const data = await response.json();
    if (data.length === 0) {
      navigate('/signup', {
        replace: true, 
        state: { type: 'phone', phoneNumber: ph }
      });
    } else {
      localStorage.setItem("user", JSON.stringify(data[0]));
      setAuthentication(true);
      navigate('/dashboard');
    }
  }

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="phoneContainer">
        <div id="recaptcha-container"></div>
        {user ? (
          checkUserExistence()
        ) : (
          <div className="phoneMain">
            <h1 className="webTitle mb-5">RENTAXO</h1>
            {showOTP ? (
              <>
                  <label htmlFor="otp" className="text-dark mb-2">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button onClick={onOTPVerify} className="btn submitBtn mt-3">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <> 
                <label htmlFor="" className="text-dark mb-2">
                  Verify your phone number
                </label>
                <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                <button onClick={onSignup} className="btn submitBtn mt-2">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
