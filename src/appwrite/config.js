import conf from "../conf/conf"
import {Client, ID, Databases, Storage, Query} from "appwrite"
export class Service{

    client = new Client();
    database;
    bucket;

    // creating a constructor
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client);
        this.bucket= new Storage(this.client);
    }
 
// create post 

    async createPost({title, slug , content, featureImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId, // database id
                conf.appwriteCollectionId, //collection id

                slug, //document id
                {
                    //create in post
                    title,
                    content,
                    featureImage,
                    status,
                    userId

                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug , {title, content, featureImage, status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId, // database id
                conf.appwriteCollectionId, //collection id

                slug, //document id
                {
                    title ,
                    content,
                    featureImage,
                    status
                }
            )            
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug){
        try {
             await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
               
            )
            return true
        } catch (error) {
            return false
        }
    }
    // to get the single post
    async getPost(slug){
        try {
        return await this.database.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )            
        } catch (error) {
            return false
        }
    }
    //to get all the post which are active
    async getPosts(queries=[Query.equal('status')]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            return false
        }   
    }
    // file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()

export default service