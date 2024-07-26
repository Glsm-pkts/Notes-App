import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../typees";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import CustomCard from "../components/Form/Card";
import { useState } from "react";

type Props = {
  notes: Note[];
  availableTags: Tag[];
};

const Main = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    /**
     * 1) not başlığı 1. inputta aratılan metni içermelidir. noteun başlığının küçük harfe çevrilmiş hali aratılan metnin küçük harfe çevrilmiş halini içeriyorsa koşul sağlanır
     * 
     * &&
     * 
     * 2) 2. input ile seçilen etiketler note'un içerisindeki etiketler ile birebir eşleşmeli seçilen etiketler dizisindeki her bir etiket için note'a ait etiketler arasında eşleşme kontrolü yapıcaz.
     */

const filteredNotes = notes.filter((note) =>
//! 1) başlığa göre
  note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) &&
  //! 2) etiketlere göre
  selectedTags.every((s_tag)=> note.tags.some((note_tag) => note_tag.value === s_tag.value)));


  return (
    <div className="container mx-auto py-5">
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <h1 className="d-flex gap-3 align-items-center">
          <img src="/note_logo.png" width={45} alt="" />
          <span>Notlar</span>
        </h1>
        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      <Form>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Başlığa göre ara</FormLabel>
              <FormControl onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Etikete göre ara</FormLabel>
              <ReactSelect onChange={(all_tags) => setSelectedTags(all_tags as Tag[])} className="text-black" isMulti options={availableTags} />
            </FormGroup>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4 ">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <CustomCard note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Main;
