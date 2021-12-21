import { Box, Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import { getAuth } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import moment from "moment"
import { useState } from "react"
import { db } from "../../lib/firebase"


interface FormMovimentoProps {
    setForm: (any) => void
}

export const FormMovimento = (props: FormMovimentoProps) => {

    const [data, setData] = useState('')
    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('')
    const [modo, setModo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [obs, setObs] = useState('')


    async function salvarLancamento() {
        const dados = {
            data: new Date(data),
            valor: Number(valor.replace(',','.')),
            mes: Number(moment(data).format('MM')),
            ano: Number(moment(data).format('YYYY')),
            tipo,
            modo,
            descricao: descricao.toUpperCase(),
            observacao: obs,
            usuario: getAuth().currentUser.uid 
        }

        await addDoc(collection(db, "movimentacao"), dados)
        .then(() => {
            props.setForm(false)
            alert('Tudo certo!!!')
        })
        .catch(err => {
            props.setForm(false)
            alert('Erro ao salvar o lançamento')
        })

        
        
    }

    return (
        <Flex direction="column">
            <Flex>

                <FormControl mr="1">
                    <FormLabel htmlFor='date'>Data: </FormLabel>
                    <Input id='date' type='date'
                        value={data}
                        onChange={e => setData(e.target.value)} />
                </FormControl>

                <FormControl ml="1">
                    <FormLabel htmlFor='number'>Valor: </FormLabel>
                    <Input id='number' type='number'
                        value={valor}
                        onChange={e => setValor(e.target.value)} />
                </FormControl>


            </Flex>
            <Box>
                <FormControl>
                    <FormLabel htmlFor='text'>Descrição: </FormLabel>
                    <Input id='text' type='text'
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} />
                </FormControl>
            </Box>
            <Flex my="2">
                <FormControl mr="1">
                    <FormLabel>Espécie/Banco</FormLabel>
                    <Select placeholder='Selecione...'
                        value={modo}
                        onChange={e => setModo(e.target.value)}>
                        <option value='especie'>Em espécie</option>
                        <option value='banco'>Banco</option>
                    </Select>
                </FormControl>
                <FormControl ml="1">
                    <FormLabel>Receita/Despesa</FormLabel>
                    <Select placeholder='Selecione...'
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}>
                        <option value='receita'>Receita</option>
                        <option value='despesa'>Despesa</option>
                    </Select>
                </FormControl>
            </Flex>

            <Box my="2">
                <FormControl>
                    <FormLabel htmlFor='text'>Observação: </FormLabel>
                    <Input id='text' type='text' placeholder='opcional...' 
                        value={obs}
                        onChange={e => setObs(e.target.value)}/>
                </FormControl>
            </Box>

            <Box p="2" align="right">
                <Button colorScheme="green" onClick={salvarLancamento}>Salvar</Button>
            </Box>

        </Flex>
    )
}