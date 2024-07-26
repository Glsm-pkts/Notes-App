// etiket tipi 

export type Tag = {
    label: string;
    value: string;
};

// formdan alınacak olan note verisin tipine
export type NoteData = {
    title: string;
    tags: Tag[];
    markdown: string;
}

// state kaydedilecek olan note verisinin tipine
export type Note ={
    id: string;
} & NoteData;