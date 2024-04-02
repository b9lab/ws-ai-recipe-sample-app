interface ResponseProps {
  input: string;
  response: string;
}

export default function Response(props: ResponseProps) {
  return (
    <div className="pt-5">
      <h2 className="text-xl py-2">Dialog</h2>
      <p>
        <b>User:</b> {props.input}
      </p>
      <p>
        <b>AI:</b> {props.response}
      </p>
    </div>
  );
}
