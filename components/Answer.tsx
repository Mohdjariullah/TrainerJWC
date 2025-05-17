interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface AnswerProps {
  answer: ContactFormData | string | string[] | undefined;
  isContactForm?: boolean;
}


export default function Answer({ answer, isContactForm }: AnswerProps) {

  if (isContactForm && typeof answer === 'object' && !Array.isArray(answer)) {
    const contactInfo = answer as ContactFormData;
    return (
      <div className="grid grid-cols-1 gap-2">
        {contactInfo.firstName || contactInfo.lastName ? (
          <div className="text-gray-300">
            <strong>Name:</strong> {contactInfo.firstName} {contactInfo.lastName}
          </div>
        ) : null}
        {contactInfo.email ? (
          <div className="text-gray-300">
            <strong>Email:</strong> {contactInfo.email}
          </div>
        ) : null}
        {contactInfo.phone ? (
          <div className="text-gray-300">
            <strong>Phone:</strong> {contactInfo.phone}
          </div>
        ) : null}
      </div>
    );
  }

  if (Array.isArray(answer)) {
    return <span className="font-medium">{answer.join(", ")}</span>;
  }

  return (
    <span className="font-medium">
      {typeof answer === "string" ? answer : typeof answer === "number" ? answer : answer ? JSON.stringify(answer) : ""}
    </span>
  );

}