"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ToggleMode = () => {
	const [theme, setTheme] = useState(null); // Start as null to prevent SSR mismatch

	useEffect(() => {
		// Get the theme from localStorage only after mounting
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
		document.documentElement.classList.toggle("dark", savedTheme === "dark");
	}, []);

	const toggleTheme = () => {
		if (!theme) return; // Prevent toggling before hydration
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	// Prevent rendering the button on SSR
	if (theme === null) return null;

	return (
		<Button onClick={toggleTheme} variant="outline">
			{theme === "dark" ? <Moon/> : <Sun/> }
		</Button>
	);
};

export default ToggleMode;