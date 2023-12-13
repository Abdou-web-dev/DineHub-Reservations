const PasswordStrength = ({ password }: { password: string }) => {
  function hasLowerAndUpperCase(inputString: string) {
    const hasLower = /[a-z]/.test(inputString);
    const hasUpper = /[A-Z]/.test(inputString);
    return hasLower && hasUpper;
  }

  function hasNumber(myString: string) {
    return /\d/.test(myString);
  }

  function hasSpecialCharacter(myString: string) {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(myString);
  }

  function determinePasswordStrength() {
    const conditionsMet = [
      hasLowerAndUpperCase(password),
      hasNumber(password),
      hasSpecialCharacter(password),
      password.length >= 8,
    ];

    const numberOfConditionsMet = conditionsMet.filter(
      (condition) => condition === true
    ).length;

    if (numberOfConditionsMet === 5) {
      return "Strong Password";
    } else if (numberOfConditionsMet >= 3) {
      return "Moderate Password";
    } else {
      return "Weak Password";
    }
  }

  return (
    <div
      className="px-5 py-5"
      style={{ backgroundColor: "green" }}
      data-testid="passwordStrengthDiv"
    >
      <h4 style={{ color: "white", textAlign: "center" }}>
        {determinePasswordStrength()}
      </h4>
    </div>
  );
};

export default PasswordStrength;
