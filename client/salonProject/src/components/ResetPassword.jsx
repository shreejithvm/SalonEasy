import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetpassword } from "../api/fetchApi";
import "./css/ResetPassword.css";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
    const { uid, token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const result = await resetpassword(uid, token, { password });

            setMessage(result?.data?.message || "Password reset successful");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setMessage(
                error?.response?.data?.error || "Invalid or expired reset link"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h2>Reset Password</h2>
                <p className="subtitle">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;