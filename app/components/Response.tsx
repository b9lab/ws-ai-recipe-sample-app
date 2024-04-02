interface ResponseProps {
  inputHtml: string;
  responseHtml: string;
}

export default function Response(props: ResponseProps) {
  return (
    <div className="pt-5">
      <h2>Dialog</h2>
      <div className="font-bold py-2">User:</div>
      <div
        dangerouslySetInnerHTML={{
          __html: props.inputHtml.replaceAll("\n", "<br>"),
        }}
      />
      <div className="font-bold py-2">AI:</div>
      <div
        dangerouslySetInnerHTML={{
          __html: props.responseHtml.replaceAll("\n", "<br>"),
        }}
      />
    </div>
  );
}
