export function getRegistrationErrs({ session }) {
	const errs = session.errors.registration_errs;
	if (!errs) return null;
	return Object.keys(errs).reduce((result, key) => {
		if (key === "password_hash")
			result["password"] = errs["password_hash"];
		else
			result[key] = errs[key];

		return result;
	}, {});
};

export function getLoginErrs({ session }) {
	const errs = session.errors.login_errs;
	if (errs)
		return errs.detail;
	return null;
};

export function willAuthenticate({ session }) {
	return session.willAuthenticate;
};

export function getUserInfo({ session }) {
	return session.currentUser;
}
