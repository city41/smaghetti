import { useState } from 'react';

function useLocalStorage(
	key: string,
	initialValue: string
): [string, (v: string) => void, () => void] {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<string>(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: string) => {
		try {
			// Allow value to be a function so we have same API as useState
			// Save state
			setStoredValue(value);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	const refreshValue = () => {
		setStoredValue(JSON.parse(window.localStorage.getItem(key) as string));
	};

	return [storedValue, setValue, refreshValue];
}

export { useLocalStorage };
