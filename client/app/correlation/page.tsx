// pages/correlation.tsx
"use client";
import { useState } from "react";
import { constructUrl, post } from "@/api/api";
import { Button, TextField, Container, Typography } from "@mui/material";

export default function Correlation() {
    const [tablename, setTablename] = useState("");
    const [column1, setColumn1] = useState("");
    const [column2, setColumn2] = useState("");
    const [results, setResults] = useState<any | null>(null);

    const handleSubmit = async () => {
        try {
            const url = constructUrl("data", "/api/data/correlation");
            const response = await post({
                url,
                body: { tablename, column1, column2 },
            });

            setResults(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed left-0 top-0 bg-slate-300 w-screen sm:ml-14">
            <div className="h-14 bg-slate-50 ">
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Correlation Analysis
                    </Typography>
                    <TextField
                        label="Table Name"
                        value={tablename}
                        onChange={(e) => setTablename(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="First Column"
                        value={column1}
                        onChange={(e) => setColumn1(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Second Column"
                        value={column2}
                        onChange={(e) => setColumn2(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Analyze
                    </Button>

                    {results && (
                        <div>
                            <Typography variant="h6" gutterBottom>
                                Results
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Correlation: {results.correlation}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Slope: {results.slope}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Intercept: {results.intercept}
                            </Typography>

                            <table>
                                <thead>
                                <tr>
                                    <th>Column</th>
                                    <th>Average</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{column1}</td>
                                    <td>{results["avg_" + column1]}</td>
                                </tr>
                                <tr>
                                    <td>{column2}</td>
                                    <td>{results["avg_" + column2]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}