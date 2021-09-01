import { Box, Button,Spinner } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlCleint } from '../../../utlis/createUrqlClient';
import { useGetIntId } from '../../../utlis/useGetIntId';

const EditPost= ({}) => {
        const router = useRouter();
        const intId = useGetIntId();
        const [{data, fetching}] = usePostQuery({
                pause: intId === -1,
                variables: {
                id: intId
                }
        });
        const [, updatePost] = useUpdatePostMutation ();
        if(fetching) {
                <Layout>
                        <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                        />
                </Layout>
        }

        if (!data?.post) {
                return (
                        <Layout>
                                <div>could not find post</div>
                        </Layout>
                )
            }
        return(
                <Layout variant='small'>
                <Formik 
                 initialValues={{title: data.post.title, text: data.post.text}} 
                 onSubmit={async (values ) => {
                await updatePost({id: intId, ...values })
                router.back();
                 }}>
                    {({isSubmitting}) => (
                        <Form>
                            <InputField 
                             name="title"
                             placeholder="title"
                             label="Title"
                            />
                            <Box mt={4}>
                             <InputField 
                             textarea
                             name="text"
                             placeholder="text..."
                             label="Body"
                            />
                            </Box>
                            <Button 
                            mt={4} 
                            type="submit" 
                            isLoading={isSubmitting} 
                            colorScheme="teal"
                            >
                                update post
                             </Button>
                        </Form>
                    )}
                </Formik> 
                </Layout>      
            );
}

export default withUrqlClient(createUrqlCleint) (EditPost);