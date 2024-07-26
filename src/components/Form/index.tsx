import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, Navigate, useNavigate } from "react-router-dom"
import ReactSelect from "react-select/creatable"
import { CreateProps } from "../../pages/Create"
import { Tag } from "../../typees"
import { v4 } from "uuid"


const CustomForm = ({handleSubmit,
  createTag,
  availableTags,
  markdown = "",
  title = "",
  tags = []
}:CreateProps) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const textareRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  //!form gönderilince
const handleSent = (e: FormEvent) =>{
e.preventDefault();

//!yeni oluşturulan notu kaydet
handleSubmit({
  title: inputRef.current?.value as string,
  markdown:textareRef.current?.value as string,
  tags: selectedTags
})

//!anasayfaya yönlendirme
navigate("/")

}

  return (
    <Form onSubmit={handleSent}className="mt-4">
      {/**başlık etiket inputu */}
      <Row>
  <Col><Form.Group controlId="title" className="">
        <Form.Label>Başlık</Form.Label>
        <Form.Control defaultValue={title} ref={inputRef} />
      </Form.Group >
</Col>
 <Col><Form.Group controlId="tags" className="">
        <Form.Label>Etiketler</Form.Label>

        <ReactSelect 
        className="text-black" 
        isMulti
        options={availableTags}
        onChange={(allTags) => setSelectedTags(allTags as Tag[])}
        onCreateOption={(text:string) => {
        
          //!etiket nesnesini oluştur ve id ekle
          const newTag: Tag ={label: text, value: v4()}
         
          //!yeni etiketi locale kaydet
          createTag(newTag);

          //! seçili etiketler state'ine ekle
          setSelectedTags([...selectedTags, newTag])

        }} value={selectedTags}
        />

      </Form.Group>
</Col>
      </Row>
{/**içerik alanı */}
      <Form.Group controlId="markdown" className="mt-4">
        <Form.Label>İçerik (markdown destekler)</Form.Label>
        <Form.Control defaultValue={markdown} ref={textareRef} as={"textarea"} style={{minHeight: "300px", maxHeight:"500px"}}/>
      </Form.Group>

      {/** Buttonlar */}
      <Stack direction="horizontal" className="justify-content-end mt-5" gap={4}>
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Link>

        <Button type="submit">Kaydet</Button>
      </Stack>
    </Form>
  );
};


export default CustomForm;