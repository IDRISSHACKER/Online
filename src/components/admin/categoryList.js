import { Card, Typography } from "@material-ui/core"

export default function CategoryList({ctg}){


    return<>
        <Card className={"ctg"} >
            <Typography variant={"h5"} >{ctg.category_name}</Typography>
            <Typography variant={"body2"} >{ctg.category_desc}</Typography>
        </Card>
        <br />
    </>
}