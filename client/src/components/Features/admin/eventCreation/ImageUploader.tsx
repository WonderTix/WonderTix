/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";

export default function ImageUploader({setImageObj} : {setImageObj: (f: File | undefined) => void}) {
    const [fileObj, setFile] = useState<File>();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files === null) {
            alert("File is not valid");
        } else {
            setFile(e.currentTarget.files[0]);
        }
    }

    const fileUpload = () => {
        if (fileObj !== null)
            setImageObj(fileObj);
    }
    
    return (
        <Grid container>
            <Grid item xs={6}>
                <p>Upload an image</p>
            </Grid>
            <Grid item xs={12}>
                <input
                    accept="image/*"
                    name="newImage"
                    id="file-input"
                    type="file"
                    onChange={onFileChange}
                />
                <label htmlFor="file-input">
                    <Button
                        color="primary"
                        endIcon={<BackupIcon />}
                        onClick={fileUpload}
                    >
                        Upload
                    </Button>
                </label>
            </Grid>
        </Grid>
    )
}
