import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { updateUserProfile } from "../utils/API"; // ✅ you'll make this API function

export default function ProfileSetup() {
  const [profileData, setProfileData] = useState({
    age: "",
    height: "",
    weight: "",
    goal: "",
    fitness_level: ""
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUserProfile(profileData);
      if (!res || res.error) throw new Error("Failed to update profile");

      // ✅ update localStorage with new profile info
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, ...profileData }));

      // ✅ send them to home once profile is done
      navigate("/home");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="form-div bg-white p-4 rounded w-50 border">
        <h2>Complete Your Profile</h2>
        <p>Enter your details so we can build a custom workout plan!</p>

        <Form onSubmit={handleSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong while saving your profile.
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 5'10 or 178cm"
              name="height"
              value={profileData.height}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weight (lbs)</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={profileData.weight}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Goal</Form.Label>
            <Form.Select
              name="goal"
              value={profileData.goal}
              onChange={handleChange}
              required
            >
              <option value="">-- Select your goal --</option>
              <option value="toned">Toned</option>
              <option value="muscular">Muscular</option>
              <option value="bulk">Bulk</option>
              <option value="lean">Lean</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fitness Level</Form.Label>
            <Form.Select
              name="fitness_level"
              value={profileData.fitness_level}
              onChange={handleChange}
              required
            >
              <option value="">-- Select your fitness level --</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="btn btn-success w-100">
            Save Profile
          </Button>
        </Form>
      </div>
    </div>
  );
}
