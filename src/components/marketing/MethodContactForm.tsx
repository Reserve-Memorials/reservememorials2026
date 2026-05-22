const METHOD_FORM_URL =
  "https://reservememorials.method.ws/apps/Public.aspx#/628471c8-4121-4d85-85d8-5594f814ee31/Z0xaYWUxQlp3M3B5NF9NUmxoczJ1QS0t";

export function MethodContactForm() {
  return (
    <iframe
      src={METHOD_FORM_URL}
      title="Reserve Memorials contact form"
      className="block h-[1800px] w-full border-0"
      style={{ border: 0 }}
    />
  );
}
